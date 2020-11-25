export class SubChallenge {
  name: string;
  hidden: boolean;
  selected: boolean;
  price?: PriceObj;

  havePrice?(): boolean {
    return Object.values(this.price).reduce((a, b) => a + b, 0) > 0;
  }
}

export interface PriceObj {
  ex: number;
  c: number;
}

export const DefaultChallengeList: Array<Array<SubChallenge>> = [
  [
    {
      name: 'C0',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C1',
      hidden: false,
      selected: false,
    },
    {
      name: 'C2',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C3',
      hidden: false,
      selected: false,
    },
    {
      name: 'C4',
      hidden: false,
      selected: false,
    },
    {
      name: 'C5',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C6',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C7',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C8',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C9',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C10',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C11',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C12',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C13',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C14',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C15',
      hidden: false,
      selected: false,
    }
  ],
  [
    {
      name: 'C16',
      hidden: false,
      selected: false,
    }
  ],
];
