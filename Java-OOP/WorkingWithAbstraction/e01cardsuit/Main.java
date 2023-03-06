package e01cardsuit;
public class Main {
    public static void main(String[] args) {
        CardSuit[] values = CardSuit.values();
        int length = values.length;

        System.out.println("Card Suits:");
        for (int currentSuit = 0; currentSuit < length; currentSuit++) {
            System.out.printf("Ordinal value: %d; Name value: %s%n",
                    currentSuit, values[currentSuit]);
        }
    }
}
