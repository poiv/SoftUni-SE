import java.util.*;

public class ClimbThePeaks {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        ArrayDeque<Integer> foodQuantities = new ArrayDeque<>();
        Arrays.stream(scanner.nextLine()
                        .split(", "))
                .map(Integer::parseInt)
                .forEach(foodQuantities::push);

        ArrayDeque<Integer> staminaQuantities = new ArrayDeque<>();
        Arrays.stream(scanner.nextLine()
                        .split(", "))
                .map(Integer::parseInt)
                .forEach(staminaQuantities::offer);


        Map<Integer, String> peaks = new LinkedHashMap<>();
        peaks.put(80, "Vihren");
        peaks.put(90, "Kutelo");
        peaks.put(100, "Banski Suhodol");
        peaks.put(60, "Polezhan");
        peaks.put(70, "Kamenitza");

        ArrayDeque<Integer> peakDifficulty = new ArrayDeque<>(peaks.keySet());

        for (int i = 0; i < 7; i++) {
            int points = foodQuantities.pop() + staminaQuantities.poll();

            if (points >= peakDifficulty.peek()){
                peakDifficulty.poll();
                if (peakDifficulty.isEmpty()){
                    break;
                }
            }
        }

        if (peakDifficulty.isEmpty()){
            System.out.println("Alex did it! He climbed all top five Pirin peaks in one week -> @FIVEinAWEEK");
        } else {
            System.out.println("Alex failed! He has to organize his journey better next time -> @PIRINWINS");
        }

        if (peakDifficulty.size() < 5){
            System.out.println("Conquered peaks:");
            peaks.forEach((k, v) -> {
                if (!peakDifficulty.contains(k)){
                    System.out.println(v);
                }
            });

        }
    }
}
