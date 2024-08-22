import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {

  
  constructor(
    @InjectModel( Pokemon.name )
    private readonly pokemonModel : Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ){}

  
  async executeSeed() {
    const pokemonsToInsert : { name: string, no: number }[] = []; 
    await this.pokemonModel.deleteMany({});
    const data = await this.http.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=650&offset=0');
    data.results.forEach(async ({name,url}) => {
      const urlSplit = url.split('/');
      const no = +urlSplit[urlSplit.length - 2];
      pokemonsToInsert.push({name, no});
    })
    await this.pokemonModel.insertMany(pokemonsToInsert);
    return 'Seed Execute';
  }

}
