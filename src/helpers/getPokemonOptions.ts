import pokemonApi from '@/api/pokemonApi'

export interface Pokemon {
  name: string
  id: number
}

export const getPokemons = (): number[] => {
  const pokemonsArr = Array.from(Array(650))
  return pokemonsArr.map((_, index) => index + 1)
}

const getPokemonOptions = async (): Promise<Pokemon[]> => {
  const mixedPokemons = getPokemons().sort(() => Math.random() - 0.5)
  const pokemons = await getPokemonNames(mixedPokemons.splice(0, 4)) //* Corta de la posición 0 a 3
  return pokemons
}

export const getPokemonNames = async ([a, b, c, d]: number[] = []): Promise<Pokemon[]> => {
  // const resp = await pokemonApi.get(`/1`)
  // console.log(resp.data.name);

  const promiseArr = [
    pokemonApi.get(`/${a}`),
    pokemonApi.get(`/${b}`),
    pokemonApi.get(`/${c}`),
    pokemonApi.get(`/${d}`),
  ]
  const [p1, p2, p3, p4] = await Promise.all(promiseArr)
  return [
    { name: p1.data.name, id: p1.data.id },
    { name: p2.data.name, id: p2.data.id },
    { name: p3.data.name, id: p3.data.id },
    { name: p4.data.name, id: p4.data.id },
  ]
}

export default getPokemonOptions
