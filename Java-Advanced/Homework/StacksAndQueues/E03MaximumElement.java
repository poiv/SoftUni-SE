import java.util.*;

public class E03MaximumElement {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        Deque<Integer> stack = new ArrayDeque<>();

        int commands = Integer.parseInt(scanner.nextLine());

        while (commands > 0){
            int[] input = Arrays.stream(scanner.nextLine().split("\\s+"))
                    .mapToInt(Integer::parseInt).toArray();
            int n = input[0];
            int x = input[1];

            switch (n){
                case 1:
                    stack.push(x);
                    break;
                case 2:
                    stack.pop();
                    break;
                case 3:
                    System.out.println(stack.stream()
                                .max(Integer::compareTo).get());
                    break;
            }

            commands--;
        }
    }
}
