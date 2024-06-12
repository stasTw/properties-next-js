export class Property {

    public constructor(State: string, PropertyId: string, BuildingName: string, MainImage: Img, Longitude: number, Latitude: number, Address: string, Zip: number) {
        this.PropertyId = PropertyId;
        this.BuildingName = BuildingName;
        this.MainImage = MainImage;
        this.Longitude = Longitude;
        this.Latitude = Latitude;
        this.Address = Address;
        this.Zip = Zip;
        this.State = State;
    }
    public PropertyId: string;
    public BuildingName: string;
    public MainImage: Img;
    public Longitude: number;
    public Latitude: number;
    public Address: string;
    public Zip: number;
    public State: string;
}

export class Img {
    public constructor(ImagePath: string) {
        this.ImagePath = ImagePath;
    }
    public ImagePath: string;
}

export class SearchConfig {
    public constructor(byAddress: boolean, byName: boolean, byState: boolean) {
        this.byAddress = byAddress;
        this.byName = byName;
        this.byState = byState;
    }
    public byAddress: boolean;
    public byName: boolean;
    public byState: boolean;
}