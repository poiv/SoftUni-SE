import java.util.*;

public class E07SimpleTextEditor {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        Deque<String> historyStack = new ArrayDeque<>();
        StringBuilder text = new StringBuilder();

        int ops = Integer.parseInt(scanner.nextLine());
        while (ops > 0){
            String[] commandInput = scanner.nextLine().split("\\s+");
            int command = Integer.parseInt(commandInput[0]);
            String argument = commandInput.length == 2
                    ? commandInput[1]
                    : "";

            switch (command){
                case 1:
                    text.append(argument);
                    break;
                case 2:
                    int textLength = text.length();
                    int countStart = textLength - Integer.parseInt(argument);
                    text.delete(countStart, textLength);
                    break;
                case 3:
                    int index = Integer.parseInt(argument) - 1;
                    System.out.println(text.toString().charAt(index));
                    break;
                case 4:
                    text.setLength(0);
                    historyStack.pop();
                    if (!historyStack.isEmpty()){
                        text.append(historyStack.peek());
                    }
                    break;
            }

            if (command < 3){
                historyStack.push(text.toString());
            }
            ops--;

        }
    }
}
