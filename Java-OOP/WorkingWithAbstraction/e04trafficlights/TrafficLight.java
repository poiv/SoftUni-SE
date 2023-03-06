package e04trafficlights;
public enum TrafficLight {
    RED,
    GREEN,
    YELLOW;

    public TrafficLight next(){
        int o = (ordinal()+1) % 3;
        return TrafficLight.values()[o];
    }
}
