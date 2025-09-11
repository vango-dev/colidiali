from pymongo import MongoClient
import bcrypt
import json
import sys

def populate(index, location, collection):
    # Sample data
    salt = bcrypt.gensalt(rounds=10)
    pass_ = 'passDoe123_' + str(index)
    pass_encoded = pass_.encode('utf-8')

    sample_transporter = {
            "fName": "John",
            "lName": "Doe_" + str(index),
            "businessName": "Doe Transport " + str(index),
            "email": "john.doe_" + str(index) + "@example.com",
            "password": bcrypt.hashpw(pass_encoded, salt),
            "phone": "1234567890",
            "photoUrl": "https://www.dds-online.de/wp-content/uploads/V/W/VW-Crafter-mittellang_62153DC5-9FA5-4A11-84FF-85E68F696FA8.jpg",
            "location": {"lng": location["lon"] , "lat": location["lat"]},
            "cities": ["Munich", "Berlin"],
            "countries": "Germany",
            "description": "Transport services provider",
            "images": ["https://www.dds-online.de/wp-content/uploads/V/W/VW-Crafter-mittellang_62153DC5-9FA5-4A11-84FF-85E68F696FA8.jpg"],
            "facebookLink": "http://facebook.com/johndoe",
            "instagramLink": "http://instagram.com/johndoe",
            "tikTokLink": "http://tiktok.com/johndoe",
            "xLink": "http://example.com/johndoe",
            "isVerified": True,
            "isAdminVerified": True,
        }
    
    return sample_transporter

def add_all_samples(sample_transporters):
    # Insert sample data into MongoDB
    collection.insert_many(sample_transporters)
    print('All samples added.')

def remove_all_samples(collection):
    filter_criteria = {"fName": "John"}
    collection.delete_many(filter_criteria)
    print('All samples removed.')


if __name__ == '__main__':
    # Connect to the remote MongoDB database
    remote_connection_string = 'mongodb+srv://iliassanati:W2X7HaYVF8i8YwC@dilimaak.jyryj8h.mongodb.net/vanf_finder_db'
    client = MongoClient(remote_connection_string)
    db = client['vanf_finder_db']
    collection = db['transporters']
    if '--delete' in sys.argv:
        remove_all_samples(collection)

    else:
        # Read random locations
        with open('samples.json', 'r') as file:
            # Load JSON data
            data = json.load(file)
            sample_transporters = []
            count = 0
            for location in data["locations"]:
                sample_transporters.append(populate(count, location, collection))
                count += 1
            add_all_samples(sample_transporters)
        # Close the MongoDB connection
    client.close()
    print('Done. Nod tchelel')