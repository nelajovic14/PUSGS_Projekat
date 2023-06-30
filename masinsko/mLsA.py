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


df = pd.read_csv('archive/Clothing Reviews.csv')

comments = []

for i, row in tqdm(df.iterrows(),total=len(df)):
    text=row['Review Text']
    rating=row['Rating']
    comments.append((text,rating))
    
stop_words = set(stopwords.words('english'))


preprocessed_comments = [(preprocess(comment,word_tokenize,stop_words), label) for comment, label in comments ]

# Step 3: Feature Extraction



featuresets = [(extract_features(comment,word_tokenize), label) for comment, label in preprocessed_comments]

# Step 4: Train/Test Split
train_set, test_set = train_test_split(featuresets, test_size=0.2, random_state=42)


# Step 5: Model Training
classifier = NaiveBayesClassifier.train(train_set)

# Step 6: Model Evaluation
predicted_labels = classifier.classify_many([features for features, _ in test_set])
true_labels = [label for _, label in test_set]

accuracy = accuracy_score(true_labels, predicted_labels)
print("Accuracy:", accuracy)

# Step 7: Model Deployment

import pickle
f = open('my_classifier.pickle', 'wb')
pickle.dump(classifier, f)
f.close()
