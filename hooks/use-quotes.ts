import { useEffect, useState } from "react";
import axios from "axios";

type Quote = {
  q: string;
  a: string;
};

export const useQuotes = () => {
  const offlineQuotes = [
    {
      q: "The chief danger in life is that you may take too many precautions.",
      a: "Alfred Adler",
      c: "67",
      h: "<blockquote>&ldquo;The chief danger in life is that you may take too many precautions.&rdquo; &mdash; <footer>Alfred Adler</footer></blockquote>",
    },
    {
      q: "Happiness cannot be traveled to, owned, earned, worn or consumed.",
      a: "Denis Waitley",
      c: "65",
      h: "<blockquote>&ldquo;Happiness cannot be traveled to, owned, earned, worn or consumed.&rdquo; &mdash; <footer>Denis Waitley</footer></blockquote>",
    },
    {
      q: "Go for it now. The future is promised to no one. ",
      a: "Wayne Dyer",
      c: "49",
      h: "<blockquote>&ldquo;Go for it now. The future is promised to no one. &rdquo; &mdash; <footer>Wayne Dyer</footer></blockquote>",
    },
    {
      q: "There is no limit to the amount of good you can do if you don't care who gets the credit.",
      a: "Ronald Reagan",
      c: "89",
      h: "<blockquote>&ldquo;There is no limit to the amount of good you can do if you don't care who gets the credit.&rdquo; &mdash; <footer>Ronald Reagan</footer></blockquote>",
    },
    {
      q: "If you want to find the secrets of the universe, think in terms of energy, frequency and vibration. ",
      a: "Nikola Tesla",
      c: "100",
      h: "<blockquote>&ldquo;If you want to find the secrets of the universe, think in terms of energy, frequency and vibration. &rdquo; &mdash; <footer>Nikola Tesla</footer></blockquote>",
    },
    {
      q: "Comedy = tragedy + time.",
      a: "Carol Burnett",
      c: "24",
      h: "<blockquote>&ldquo;Comedy = tragedy + time.&rdquo; &mdash; <footer>Carol Burnett</footer></blockquote>",
    },
  ];
  const [quotes, setQuotes] = useState<Quote[]>(offlineQuotes);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchQuotes = async () => {
      try {
        setIsLoading(true);
        const res = await axios.get("https://zenquotes.io/api/quotes");
        const data: Quote[] = res.data;
        setQuotes(data);
      } catch (error) {
        if (error instanceof Error) {
          return console.log(error.message);
        }
        return console.log("Something went wrong while fetching quotes");
      } finally {
        setIsLoading(false);
      }
    };
    fetchQuotes();
  }, []);

  return { quotes, isLoading };
};
