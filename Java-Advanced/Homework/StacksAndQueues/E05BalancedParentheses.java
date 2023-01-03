import java.util.*;

public class E05BalancedParentheses {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);
        char[] parentheses = scanner.nextLine().toCharArray();

        Set<Character> openingParentheses = Set.of('{', '(', '[');
        Deque<Character> stack = new ArrayDeque<>();

        if(parentheses.length < 1 || parentheses.length % 2 != 0){
            System.out.print("NO");
            return;
        }

        for (char current : parentheses) {
            if (openingParentheses.contains(current)) {
                stack.push(current);
            } else if (isMatching(stack, current)) {
                stack.pop();
            }
        }

        System.out.println(stack.isEmpty()
                ? "YES"
                : "NO");

    }

    private static boolean isMatching(Deque<Character> stack, char current) {
        return (stack.peek() == '{' && current == '}')
                || (stack.peek() == '[' && current == ']')
                || (stack.peek() == '(' && current == ')');
    }
}
