import java.util.*;

public class E01ReverseNumbersWithAStack {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        Deque<Integer> numbers = new ArrayDeque<>();
        Arrays.stream(scanner.nextLine().split("\\s+"))
                .mapToInt(Integer::parseInt)
                .forEach(numbers::push);

        while(!numbers.isEmpty()) System.out.print(numbers.pop() + " ");
    }
}
