export interface AmbiphoneSound {
  id: string;
  name: string;
  url: string;
}

export const AMBIPHONE_SOUNDS: AmbiphoneSound[] = [
  {
    id: 'heavy-rain',
    name: 'Rain',
    url: 'https://s.ambiph.one/sounds/heavy-rain.flac',
  },
  {
    id: 'bubbling-water',
    name: 'Water',
    url: 'https://s.ambiph.one/sounds/bubbling-water.flac',
  },
  {
    id: 'strong-wind',
    name: 'Wind',
    url: 'https://s.ambiph.one/sounds/strong-wind.flac',
  },
  {
    id: 'underwater',
    name: 'Underwater',
    url: 'https://s.ambiph.one/sounds/underwater.flac',
  },
  {
    id: 'fire',
    name: 'Fire',
    url: 'https://s.ambiph.one/sounds/fire.flac',
  },
];
