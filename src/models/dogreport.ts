/**
 * This is the Dog report that send to db, when find dogs.
 */
export class DogReport {
    
    public name: string;
    public about: string;
    public stay_in_touch_phone_numer: string;
    public stay_near_dog: boolean;
    public dog_location_latitude: number;
    public dog_location_longitude: number;
    public dog_picture_base64:string;

    constructor() {
    this.name = '',
    this.about = '',
    this.stay_in_touch_phone_numer = '',
    this.stay_near_dog = false,
    this.dog_location_latitude = 0,
    this.dog_location_longitude = 0,
    this.dog_picture_base64 = ''
    }
    
}
    