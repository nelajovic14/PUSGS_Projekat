from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
stop_words = set(stopwords.words('english'))

def rate_the_comment(new_comment,classifier):
    preprocessed_new_comment = preprocess(new_comment,word_tokenize,stop_words)
    features_new_comment = extract_features(preprocessed_new_comment,word_tokenize)
    print(features_new_comment)
    sentiment = classifier.classify(features_new_comment)
    return sentiment

def extract_features(comment,word_tokenize):
    return {word: True for word in word_tokenize(comment)}


def preprocess(comment,word_tokenize,stop_words):
    tokens = word_tokenize(comment.lower())
    cleaned_tokens = [token for token in tokens if token.isalpha() and token not in stop_words]
    return ' '.join(cleaned_tokens)