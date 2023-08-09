import axios from "axios";

interface Quotes {
  id: number;
  advice: string;
}

const getQuotes = async (): Promise<Quotes | null> => {
  const response = await axios.get(`https://api.adviceslip.com/advice`);
  return response.data.slip;
};

export { getQuotes };
