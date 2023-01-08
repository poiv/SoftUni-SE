package e03cards_with_power;

public class Card {
    private final Rank rank;
    private final Suit suit;
    public Card(Rank rank, Suit suit){
        this.rank = rank;
        this.suit = suit;
    }

    public int getPower(){
        return rank.power + suit.power;
    }

    public String toString(){
        return String.format("Card name: %s of %s; Card power: %d",
                rank, suit, getPower());
    }
}
