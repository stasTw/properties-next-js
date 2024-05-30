export class Property {

    public constructor(BuildingName: string, MainImage: Img, Longitude: number, Latitude: number){
        this.BuildingName = BuildingName;
        this.MainImage = MainImage;
        this.Longitude = Longitude;
        this.Latitude = Latitude;
    }
    // public id: string;
    public BuildingName: string;
    public MainImage: Img;
    public Longitude: number;
    public Latitude: number;
}

export class Img {
    public constructor(ImagePath: string){
        this.ImagePath = ImagePath;
    }
    public ImagePath: string;
}