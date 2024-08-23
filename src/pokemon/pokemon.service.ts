import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { isValidObjectId, Model } from 'mongoose';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {

  private readonly defaultLimit : number;

  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel : Model<Pokemon>,
    private readonly configService : ConfigService,
  ){
    this.defaultLimit = this.configService.get<number>('default_limit')
  }

  async create(createPokemonDto: CreatePokemonDto) {
    try {
      createPokemonDto.name = createPokemonDto.name.toLowerCase();
      const pokemon = await this.pokemonModel.create( createPokemonDto );
      return pokemon;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async findAll(limit: number = this.defaultLimit, offset: number) {
    return await this.pokemonModel.find()
            .limit(limit)
            .skip( limit * offset )
            .select('-__v');
  }

  async findOne(term: string) {
    let pokemon : Pokemon;
    if( !isNaN(+term) ){
      pokemon = await this.pokemonModel.findOne({ no: term });
    }

    if( !pokemon && isValidObjectId( term )){
      pokemon = await this.pokemonModel.findById(term);
    }

    if( !pokemon ) {
      pokemon = await this.pokemonModel.findOne({ name: term })
    }

    if(!pokemon) throw new NotFoundException(`Pokemon with ${term} not found`)
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne( term );
      if( updatePokemonDto.name ) updatePokemonDto.name = updatePokemonDto.name.toLocaleLowerCase();
      await pokemon.updateOne( updatePokemonDto, { new: true });
      return {...pokemon.toJSON(), ...updatePokemonDto};
    } catch (error) {
      this.handleExceptions(error);
    }

  }
  async remove(id: string) {
    // const result = await this.pokemonModel.findByIdAndDelete(id);
    const { deletedCount } = await this.pokemonModel.deleteOne({_id : id});
    if( deletedCount === 0 ) throw new BadRequestException(`Pokemon with id ${id} not found`)
    return;
  }

  private handleExceptions( error : any ){
    if( error.code === 11000) {
      throw new BadRequestException(`Pokemon exits in db ${JSON.stringify( error.keyValue )} `)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)
  }
}
