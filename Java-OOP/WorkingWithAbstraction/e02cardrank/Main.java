package e02cardrank;
public class Main {
    public static void main(String[] args) {
        CardRank[] values = CardRank.values();
        int length = values.length;

        System.out.println("Card Ranks:");
        for (int currentSuit = 0; currentSuit < length; currentSuit++) {
            System.out.printf("Ordinal value: %d; Name value: %s%n",
                    currentSuit, values[currentSuit]);
        }
    }
}
