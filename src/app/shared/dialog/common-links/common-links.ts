export interface CommonLink {
  url: string;
  displayName: string; // i18n OR Original name
  iconUrl?: string;
}

export const COMMON_LINKS: CommonLink[] = [
  {
    url: 'https://poe.trade/',
    displayName: 'PoE Goods'
  },
  {
    url: 'https://www.pathofexile.com/trade/search',
    displayName: 'Trade - Path of Exile'
  },
  {
    url: 'https://poemap.live/',
    displayName: 'PoeMap'
  },
  {
    url: 'https://www.poelab.com/',
    displayName: 'Lab'
  },
  {
    url: 'https://poe.ninja/',
    displayName: 'Ninja'
  },
  {
    url: 'https://poe.ninja/challenge/builds',
    displayName: 'Ninja Builds'
  },
  {
    url: 'https://www.reddit.com/r/pathofexile/',
    displayName: 'Reddit'
  }
]
