import java.util.*;

public class E04BasicQueueOperations {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Deque<Integer> queue = new ArrayDeque<>();

        int[] input = Arrays.stream(scanner.nextLine().split("\\s+"))
                .mapToInt(Integer::parseInt).toArray();
        int numsToAdd = input[0] - input[1];
        int numToCheck = input[2];

        Arrays.stream(scanner.nextLine().split("\\s+"))
                .limit(numsToAdd)
                .mapToInt(Integer::parseInt)
                .forEach(queue::add);

        System.out.println(queue.contains(numToCheck)
                ? true
                : getOutput(queue));
    }

    private static String getOutput(Deque<Integer> numbers) {
        if (numbers.isEmpty()) return "0";

        return numbers.stream()
                .min(Integer::compareTo).get().toString();
    }
}
