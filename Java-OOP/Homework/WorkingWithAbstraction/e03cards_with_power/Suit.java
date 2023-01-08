package e03cards_with_power;

public enum Suit {

    CLUBS(0),
    DIAMONDS(13),
    HEARTS(26),
    SPADES(39);
    public final int power;
    Suit(int power) {
        this.power = power;
    }
}
