export interface Area {
  id: string;
  name: string;
  slug: string;
  description: string;
}

const areas: Area[] = [
  {
    id: '1',
    name: 'Pamplona y Comarca',
    slug: 'pamplona-y-comarca',
    description: 'La capital de Navarra y sus alrededores, conocida por sus fiestas de San Fermín y su rica historia.'
  },
  {
    id: '2',
    name: 'Ribera',
    slug: 'ribera',
    description: 'Zona sur de Navarra, famosa por sus huertas, el desierto de las Bardenas Reales y su gastronomía.'
  },
  {
    id: '3',
    name: 'Zona Media',
    slug: 'zona-media',
    description: 'Región que combina la montaña y el valle, con importantes monumentos históricos y bodegas de vino.'
  },
  {
    id: '4',
    name: 'Tierra Estella',
    slug: 'tierra-estella',
    description: 'Área occidental de Navarra, conocida por su patrimonio cultural, el Camino de Santiago y sus vinos.'
  },
  {
    id: '5',
    name: 'Pirineo Navarro',
    slug: 'pirineo-navarro',
    description: 'Zona norte de Navarra, caracterizada por sus impresionantes paisajes montañosos, bosques y valles.'
  }
];

export async function getAreas(): Promise<Area[]> {
  return areas;
}

export async function getAreaBySlug(slug: string): Promise<Area | undefined> {
  return areas.find(area => area.slug === slug);
}

export async function getAreaById(id: string): Promise<Area | undefined> {
  return areas.find(area => area.id === id);
}

