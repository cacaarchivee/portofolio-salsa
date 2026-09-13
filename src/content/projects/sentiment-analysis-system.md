---
title: "Sentiment Analysis System"
shortTitle: "Sentiment Analysis"
description: "A thesis project comparing text-vectorization approaches for three-class sentiment analysis of 455 Twitter/X comments."
category: "Academic project / thesis"
role: "Developer / Machine Learning"
stack:
  - Python
  - Pandas
  - Scikit-learn
  - NLTK
  - Sastrawi
  - Multinomial Naive Bayes
  - CountVectorizer
  - TF-IDF
  - N-gram
cover: "/images/project-sentiment-analysis.svg"
featured: false
order: 4
---

## Overview

This thesis project classified 455 Twitter/X records as negative, neutral, or positive with Multinomial Naive Bayes. It compared CountVectorizer, TF-IDF, and N-gram representations; CountVectorizer was reported as the best-performing approach in the source CV.

## Context and challenge

Indonesian social-media text requires normalization before classification. The documented preprocessing flow included case folding, tokenization, cleaning, Indonesian stopword removal, stemming, and filtering.

## My contribution

Salsabilla prepared the text-processing pipeline with Pandas, NLTK, and Sastrawi; compared the documented vectorization approaches; trained and evaluated Multinomial Naive Bayes; implemented prediction with confidence scores; and saved the selected model and vectorizer as `.pkl` files.

## Implementation highlights

- Dataset: 455 comments across negative, neutral, and positive classes.
- Split: 364 training samples and 91 testing samples, matching the documented 80:20 split.
- Feature comparison: CountVectorizer, TF-IDF, and N-gram features including unigram and bigram representations.
- Reported test-split results: 83.52% accuracy, 81.20% precision, 83.52% recall, and 82.29% F1-score.
- Reported 5-fold cross-validation accuracy: 80.66% ± 5.23%.

## Outcome

CountVectorizer was reported as the strongest of the compared representations. Test-split metrics and cross-validation results are presented separately because they measure different evaluation procedures.

## Information boundary

These figures are reported from the supplied portfolio summary and were not re-run by this website. The dataset and `.pkl` files are not included, so the site does not load the classifier. Class distribution, averaging method, and confusion matrix are not stated.
