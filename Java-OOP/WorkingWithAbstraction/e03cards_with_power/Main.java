package e03cards_with_power;

import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        Rank rank = Rank.valueOf(scanner.nextLine());
        Suit suit = Suit.valueOf(scanner.nextLine());

        System.out.print(new Card(rank, suit));
    }
}
