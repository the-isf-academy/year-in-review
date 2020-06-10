import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
import pandas as pd

# Use a service account
cred = credentials.Certificate('serviceAccountKeys.json')
firebase_admin.initialize_app(cred)

# Input: a collection name (year) and document name (unit) within the Users collection of Firestore
# Output: writes to a csv
# From the firebase, we retrieve each user's specified document from the specified collection,
# convert the document to a dictionary, appends to a list of dictionaries,
# then converts the list of dictionaries to a pandas dataframe, which we export to csv.
def firestore_to_csv(collectionname, docname, csv_filename):
    db = firestore.client()
    all_users = db.collection('users').stream()
    name_list = []
    dict_list = []
    for user in all_users:
        doc_ref = db.collection("users").document(user.id).collection(collectionname).document(docname)
        doc = doc_ref.get()
        if doc.exists:
            name_list.append(user.id)
            dict_list.append(doc.to_dict())
    df = pd.DataFrame(dict_list, index=name_list)
    df.to_csv(csv_filename)


firestore_to_csv("2019-2020", "EndofYear", "EndofYear_Responses.csv")
