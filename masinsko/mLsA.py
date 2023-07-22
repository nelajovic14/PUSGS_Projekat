import pandas as pd
import numpy as np
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.classify import NaiveBayesClassifier
from nltk.sentiment import SentimentIntensityAnalyzer
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score
from nltk.sentiment import SentimentIntensityAnalyzer
from tqdm.notebook import tqdm
from functionsSentAna import preprocess,extract_features,rate_the_comment
import matplotlib.pyplot as plt

df = pd.read_csv('archive/Clothing Reviews.csv')
dftrening=df.head(18112);
ax = dftrening['Rating'].value_counts().sort_index() \
    .plot(kind='bar',
         title='Count of Comments by Stars for Training',
          figsize=(10, 5))
ax.set_xlabel('Review Stars')
plt.show()

dftest=df.head(4529);
ax = dftest['Rating'].value_counts().sort_index() \
    .plot(kind='bar',
         title='Count of Comments by Stars for Testing',
          figsize=(10, 5))
ax.set_xlabel('Review Stars')
plt.show()

comments = []

for i, row in tqdm(df.iterrows(),total=len(df)):
    text=row['Review Text']
    rating=row['Rating']
    comments.append((text,rating))
    
stop_words = set(stopwords.words('english'))


preprocessed_comments = [(preprocess(comment,word_tokenize,stop_words), label) for comment, label in comments ]

featuresets = [(extract_features(comment,word_tokenize), label) for comment, label in preprocessed_comments]

train_set, test_set = train_test_split(featuresets, test_size=0.2, random_state=42)

classifier = NaiveBayesClassifier.train(train_set)

predicted_labels = classifier.classify_many([features for features, _ in test_set])
true_labels = [label for _, label in test_set]

accuracy = accuracy_score(true_labels, predicted_labels)
print("Accuracy:", accuracy)

import pickle
f = open('my_classifier.pickle', 'wb')
pickle.dump(classifier, f)
f.close()
