from transcribe_streaming_mic import *
import string
from fuzzysearch import find_near_matches

def match(script):
	# remove_punc = str.maketrans('', '', string.punctuation)
	to_say = script
	said = ""
	print("Start speaking!")
	transcription = transcribe()
	for text in transcription:
		words = text.split()
		for word in words:
			# match word from transcription to similar words in to_say
			# if word matches in many areas choose the first match
			if not find_near_matches(word, to_say, max_l_dist=1):
				continue

			firstmatch = find_near_matches(word, to_say, max_l_dist=1)[0]

			start_index = firstmatch.start
			end_index = firstmatch.end

			# get the larger original word from the script
			while start_index - 1 >= 0 and to_say[start_index - 1] != " ":
				start_index -= 1

			while  end_index < len(to_say)-1 and to_say[end_index] != " ":
				end_index += 1

			# if a word/phrase has been said, remove from to_say, add to said
			word_said = to_say[start_index:end_index+1]
			to_say = to_say.replace(word_said, "", 1)
			said += word_said

			yield said, to_say 