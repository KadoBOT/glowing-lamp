type PromiseVoidFn = () => Promise < void >;
type HandleCheckBox = (e : CheckboxChangeEvent) => Promise < void >;
type HandleRadius = (arg : number | undefined) => Promise < void >;
type HandleCheckTag = (name : string) => (checked : boolean) => Promise < void >;
type IsChecked = (name : string) => boolean;

type Categories = {
  id: string,
  shortName: string,
  name: string,
  icon: {
    prefix: string,
    suffix: string
  }
};

type VenueLocation = {
  address: string,
  formattedAddress: string[],
  lat: number,
  lng: number
}

type Venue = {
  id: string,
  name: string,
  string: number,
  location: VenueLocation,
  categories: Categories[]
}

type Items = {
  venue: Venue
}[]

type Group = {
  type: string,
  items: Items
}

type Groups = Group[];