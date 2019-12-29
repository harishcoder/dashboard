export class slaUpTimeDownTimeData{
    ledLight:String;
    wifi_Access_Points:String;
    CCTV : String;
    Environmental_Sensors :String; 
    VMD:String;
    EPNMServer:String;
    Fiber:String;
    constructor(ledLight:String,wifiAccessPoints:String,CCTV:String,
        environmentalSensors:String,VMD:String,EPNMServer:String,fiber:String){
        this.ledLight = ledLight;
        this.wifi_Access_Points = wifiAccessPoints;
        this.CCTV=CCTV;
        this.Environmental_Sensors = environmentalSensors;
        this.EPNMServer = EPNMServer;
        this.Fiber = fiber;
        this.VMD = VMD;
    }
}