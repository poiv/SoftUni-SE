import java.util.*;

public class E02BasicStackOperations {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Deque<Integer> numbers = new ArrayDeque<>();

        int[] input = Arrays.stream(scanner.nextLine().split("\\s++"))
                .mapToInt(Integer::parseInt).toArray();
        int numbersToPush = input[0] - input[1];
        int numberToCheck = input[2];

        Arrays.stream(scanner.nextLine().split("\\s+"))
                .limit(numbersToPush)
                .mapToInt(Integer::parseInt)
                .forEach(numbers::push);

        System.out.print(getOutput(numbers, numberToCheck));
    }

    private static String getOutput(Deque<Integer> numbers, int present) {
        if (numbers.contains(present)) {
            return "true";
        }
        if (numbers.isEmpty()) {
            return "0";
        }
        return numbers.stream()
                .min(Integer::compareTo).get().toString();
    }
}
