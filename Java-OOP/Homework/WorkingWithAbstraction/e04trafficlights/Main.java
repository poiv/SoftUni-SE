package e04trafficlights;
import java.util.Arrays;
import java.util.List;
import java.util.Scanner;
import java.util.stream.Collectors;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        List<TrafficLight> trafficLights = Arrays.stream(scanner.nextLine().split("\\s+"))
                .map(TrafficLight::valueOf).collect(Collectors.toList());

        int times = Integer.parseInt(scanner.nextLine());
        int length = trafficLights.size();

        while (times > 0){
            for (int index = 0; index < length; index++) {
                TrafficLight nextLight = trafficLights.get(index).next();
                trafficLights.set(index, nextLight);
                System.out.print(nextLight + " ");
            }
            System.out.println();
            times--;
        }
    }
}
