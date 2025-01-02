export interface Zone {
    id: string;
    name: string;
    slug: string;
    description: string;
    area: 'Pamplona y Comarca';
  }
  
  const zones: Zone[] = [
    // Pamplona
    {
      id: '1',
      name: 'Casco Antiguo',
      slug: 'casco-antiguo',
      description: 'Centro histórico de Pamplona',
      area: 'Pamplona y Comarca'
    },
    {
      id: '2',
      name: 'Ensanche',
      slug: 'ensanche',
      description: 'Zona comercial y de negocios',
      area: 'Pamplona y Comarca'
    },
    {
      id: '3',
      name: 'Rochapea',
      slug: 'rochapea',
      description: 'Barrio al norte del río Arga',
      area: 'Pamplona y Comarca'
    },
    {
      id: '4',
      name: 'San Juan',
      slug: 'san-juan',
      description: 'Zona residencial con gran actividad comercial',
      area: 'Pamplona y Comarca'
    },
    {
      id: '5',
      name: 'Iturrama',
      slug: 'iturrama',
      description: 'Barrio universitario y residencial',
      area: 'Pamplona y Comarca'
    },
    // Comarca
    {
      id: '6',
      name: 'Burlada',
      slug: 'burlada',
      description: 'Ciudad dormitorio al noreste de Pamplona',
      area: 'Pamplona y Comarca'
    },
    {
      id: '7',
      name: 'Barañáin',
      slug: 'baranain',
      description: 'Ciudad dormitorio al oeste de Pamplona',
      area: 'Pamplona y Comarca'
    },
    {
      id: '8',
      name: 'Zizur Mayor',
      slug: 'zizur-mayor',
      description: 'Ciudad residencial al sur de Pamplona',
      area: 'Pamplona y Comarca'
    },
  ];
  
  export async function getZones(): Promise<Zone[]> {
    return zones;
  }
  
  export async function getZoneBySlug(slug: string): Promise<Zone | undefined> {
    return zones.find(zone => zone.slug === slug);
  }
  
  export async function getZoneById(id: string): Promise<Zone | undefined> {
    return zones.find(zone => zone.id === id);
  }
  
  export async function getZonesByArea(area: Zone['area']): Promise<Zone[]> {
    return zones.filter(zone => zone.area === area);
  }
  
  