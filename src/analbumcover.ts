import { Spelling } from "./spelling";

const rephrase = (
	phrase: string,
	spelling: Spelling,
	minWordLength: number = 1
): string | null => {
	const chars = phrase.replace(/[^a-zA-Z]/g, "").toLocaleLowerCase();

	let f = rephraseRecursive(minWordLength, chars, spelling, minWordLength);
	if (f === phrase || f === "") {
		return null;
	}

	return f;
};

const rephraseRecursive = (
	wordLength: number,
	phrase: string,
	spelling: Spelling,
	minWordLength: number
): string => {
	if (wordLength > phrase.length) {
		return "";
	}

	if (wordLength == phrase.length) {
		if (isValidWord(phrase, spelling)) {
			return phrase;
		}
	}

	let word = phrase.slice(0, wordLength);
	let remaining = phrase.slice(wordLength, phrase.length);

	if (!isValidWord(word, spelling) || remaining.length < minWordLength) {
		return rephraseRecursive(wordLength + 1, phrase, spelling, minWordLength);
	} else {
		let r = rephraseRecursive(
			minWordLength,
			remaining,
			spelling,
			minWordLength
		);
		return word + " " + r;
	}
};

const clean = (phrase: string): string | null => {
	return phrase.toLocaleLowerCase().replace(/[^a-z ]/g, "");
};

const isValidWord = (word: string, spelling: Spelling) => {
	if (word.length === 1) {
		if (word === "a") {
			return true;
		} else {
			return false;
		}
	}
	return spelling.isCorrect(word);
};

const initialRephrasing = (
	phrase: string
): {
	unusedChars: string[];
	usedWords: string[];
} => {
	const p = phrase.replace(/[^a-zA-z]/g, "").split("");
	return {
		unusedChars: p,
		usedWords: []
	};
};

const eachSlice = (
	charactersOfWord: string[],
	fn: (slice: string[], other: string[]) => void
): string | null => {
	if (charactersOfWord.length == 0) {
		return null;
	}
	const slice = charactersOfWord.slice(0, 1);
	const other = charactersOfWord.slice(1);
	fn(slice, other);
	return slice.join();
};

export { rephrase, clean, initialRephrasing, eachSlice };
