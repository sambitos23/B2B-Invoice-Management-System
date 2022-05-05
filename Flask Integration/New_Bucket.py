import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder
import datetime as dt
import pickle



class EncoderExt(object):
    def __init__(self):
        self.label_encoder = LabelEncoder()
    def fit(self, data_list):
        self.label_encoder = self.label_encoder.fit(list(data_list) + ['Unknown'])
        self.classes_ = self.label_encoder.classes_
        return self
    def transform(self, data_list):
        new_data_list = list(data_list)
        for unique_item in np.unique(data_list):
            if unique_item not in self.label_encoder.classes_:
                new_data_list = ['Unknown' if x==unique_item else x for x in new_data_list]
        return self.label_encoder.transform(new_data_list)
    
 
def predict(nulldata):
    print(" Predict")

    #nulldata = pd.read_csv("data.csv")


    nulldata["clear_date"]=pd.to_datetime(nulldata.clear_date)
    nulldata["posting_date"]=pd.to_datetime(nulldata.posting_date)
    nulldata["due_in_date"]=pd.to_datetime(nulldata.due_in_date)
    nulldata["baseline_create_date"]=pd.to_datetime(nulldata.baseline_create_date)


    nulldata1=nulldata.copy()

    from sklearn.preprocessing import LabelEncoder
    business_codern = LabelEncoder()
    business_codern.fit(nulldata['business_code'])
    nulldata['business_code_enc'] = business_codern.transform(nulldata['business_code'])
    
   # if :
    #nulldata['cust_number'] = nulldata['cust_number'].str.replace('CCCA',"1").str.replace('CCU',"2").str.replace('CC',"3").astype(int)
    nulldata['cust_number'] = nulldata['cust_number'].replace('CCCA02',"1").replace(['CCU001','CCU013','CCU002'],"2").replace(['CC3411','CC6000'],"3").astype(int)
    #nulldata['cust_number'] = nulldata['cust_number'].str.replace('CCCA',"1").astype(int)
    #nulldata['cust_number'] = nulldata['cust_number'].str.replace('CCU',"2").astype(int)
    #nulldata['cust_number'] = nulldata['cust_number'].str.replace('CC',"3").astype(int)



    nulldata['day_of_cleardate'] = nulldata['clear_date'].dt.day
    nulldata['month_of_cleardate'] = nulldata['clear_date'].dt.month
    nulldata['year_of_cleardate'] = nulldata['clear_date'].dt.year

    nulldata['day_of_postingdate'] = nulldata['posting_date'].dt.day
    nulldata['month_of_postingdate'] = nulldata['posting_date'].dt.month
    nulldata['year_of_postingdate'] = nulldata['posting_date'].dt.year

    nulldata['day_of_due'] = nulldata['due_in_date'].dt.day
    nulldata['month_of_due'] = nulldata['due_in_date'].dt.month
    nulldata['year_of_due'] = nulldata['due_in_date'].dt.year

    nulldata['day_of_createdate'] = nulldata['baseline_create_date'].dt.day
    nulldata['month_of_createdate'] = nulldata['baseline_create_date'].dt.month
    nulldata['year_of_createdate'] = nulldata['baseline_create_date'].dt.year
    
    

    label_encoder = EncoderExt()
    label_encoder1 = EncoderExt()
    label_encoder1.fit(nulldata['cust_payment_terms'])
    label_encoder1.fit(nulldata['business_code'])
    label_encoder.fit(nulldata['name_customer'])
    nulldata['cust_payment_terms_enc']=label_encoder1.transform(nulldata['cust_payment_terms'])
    nulldata['business_code_enc']=label_encoder1.transform(nulldata['business_code'])
    nulldata['name_customer_enc']=label_encoder.transform(nulldata['name_customer'])


    nulldata.drop(['business_code',"baseline_create_date","due_in_date","posting_date","name_customer","clear_date","cust_payment_terms"],axis=1,inplace=True)
    nulldata.drop(['day_of_cleardate',"month_of_cleardate","year_of_cleardate"],axis=1,inplace=True)

    nulldata2=nulldata[['cust_number', 'buisness_year', 'doc_id', 'converted_usd',
           'business_code_enc', 'name_customer_enc', 'cust_payment_terms_enc',
           'day_of_postingdate', 'month_of_postingdate', 'year_of_postingdate',
           'day_of_createdate', 'month_of_createdate', 'year_of_createdate',
           'day_of_due', 'month_of_due', 'year_of_due']]

    model = pickle.load(open("model.sav", 'rb'))

    final_result = model.predict(nulldata2)

    final_result = pd.Series(final_result,name='avg_delay')

    nulldata1.reset_index(drop=True,inplace=True)
    nulldata.index = list(nulldata.index)
    Final = nulldata1.merge(final_result , on = nulldata.index )

    Final['clear_date'] = pd.to_datetime(Final['due_in_date']) + pd.to_timedelta(Final['avg_delay'], unit='s')

    Final['avg_delay'] = Final.apply(lambda row: row.avg_delay//(24 * 3600), axis = 1)

    bins= [0,15,30,45,60,100]
    labels = ['0-15','16-30','31-45','46-60','Greatar than 60']
    Final['Aging Bucket'] = pd.cut(Final['avg_delay'], bins=bins, labels=labels, right=False)


    Final.drop(['key_0',"avg_delay"],axis=1,inplace=True)
    Final.to_csv("Final.csv")
    Final1=Final[['doc_id','Aging Bucket']].copy()
    doc = Final1["doc_id"].tolist()
    aging= Final1["Aging Bucket"].tolist()   
    a=[]
    for i in range(len(doc)):
        a.append({"doc_id":doc[i],"aging_bucket": str(aging[i])})
    

    return a

def doc_id_bucket(doc_list):
    print(" Predict")

    nulldata = pd.read_csv("nulldata.csv")


    nulldata["clear_date"]=pd.to_datetime(nulldata.clear_date)
    nulldata["posting_date"]=pd.to_datetime(nulldata.posting_date)
    nulldata["due_in_date"]=pd.to_datetime(nulldata.due_in_date)
    nulldata["baseline_create_date"]=pd.to_datetime(nulldata.baseline_create_date)


    nulldata1=nulldata.copy()

    from sklearn.preprocessing import LabelEncoder
    business_codern = LabelEncoder()
    business_codern.fit(nulldata['business_code'])
    nulldata['business_code_enc'] = business_codern.transform(nulldata['business_code'])
    
   # if :
    #nulldata['cust_number'] = nulldata['cust_number'].str.replace('CCCA',"1").str.replace('CCU',"2").str.replace('CC',"3").astype(int)
    nulldata['cust_number'] = nulldata['cust_number'].replace('CCCA02',"1").replace(['CCU001','CCU013','CCU002'],"2").replace(['CC3411','CC6000'],"3").astype(int)
    #nulldata['cust_number'] = nulldata['cust_number'].str.replace('CCCA',"1").astype(int)
    #nulldata['cust_number'] = nulldata['cust_number'].str.replace('CCU',"2").astype(int)
    #nulldata['cust_number'] = nulldata['cust_number'].str.replace('CC',"3").astype(int)



    nulldata['day_of_cleardate'] = nulldata['clear_date'].dt.day
    nulldata['month_of_cleardate'] = nulldata['clear_date'].dt.month
    nulldata['year_of_cleardate'] = nulldata['clear_date'].dt.year

    nulldata['day_of_postingdate'] = nulldata['posting_date'].dt.day
    nulldata['month_of_postingdate'] = nulldata['posting_date'].dt.month
    nulldata['year_of_postingdate'] = nulldata['posting_date'].dt.year

    nulldata['day_of_due'] = nulldata['due_in_date'].dt.day
    nulldata['month_of_due'] = nulldata['due_in_date'].dt.month
    nulldata['year_of_due'] = nulldata['due_in_date'].dt.year

    nulldata['day_of_createdate'] = nulldata['baseline_create_date'].dt.day
    nulldata['month_of_createdate'] = nulldata['baseline_create_date'].dt.month
    nulldata['year_of_createdate'] = nulldata['baseline_create_date'].dt.year
    
    

    label_encoder = EncoderExt()
    label_encoder1 = EncoderExt()
    label_encoder1.fit(nulldata['cust_payment_terms'])
    label_encoder1.fit(nulldata['business_code'])
    label_encoder.fit(nulldata['name_customer'])
    nulldata['cust_payment_terms_enc']=label_encoder1.transform(nulldata['cust_payment_terms'])
    nulldata['business_code_enc']=label_encoder1.transform(nulldata['business_code'])
    nulldata['name_customer_enc']=label_encoder.transform(nulldata['name_customer'])


    nulldata.drop(['business_code',"baseline_create_date","due_in_date","posting_date","name_customer","clear_date","cust_payment_terms"],axis=1,inplace=True)
    nulldata.drop(['day_of_cleardate',"month_of_cleardate","year_of_cleardate"],axis=1,inplace=True)

    nulldata2=nulldata[['cust_number', 'buisness_year', 'doc_id', 'converted_usd',
           'business_code_enc', 'name_customer_enc', 'cust_payment_terms_enc',
           'day_of_postingdate', 'month_of_postingdate', 'year_of_postingdate',
           'day_of_createdate', 'month_of_createdate', 'year_of_createdate',
           'day_of_due', 'month_of_due', 'year_of_due']]

    model = pickle.load(open("model.sav", 'rb'))

    final_result = model.predict(nulldata2)

    final_result = pd.Series(final_result,name='avg_delay')

    nulldata1.reset_index(drop=True,inplace=True)
    nulldata.index = list(nulldata.index)
    Final = nulldata1.merge(final_result , on = nulldata.index )

    Final['clear_date'] = pd.to_datetime(Final['due_in_date']) + pd.to_timedelta(Final['avg_delay'], unit='s')

    Final['avg_delay'] = Final.apply(lambda row: row.avg_delay//(24 * 3600), axis = 1)

    bins= [0,15,30,45,60,100]
    labels = ['0-15','16-30','31-45','46-60','Greatar than 60']
    Final['Aging Bucket'] = pd.cut(Final['avg_delay'], bins=bins, labels=labels, right=False)


    Final.drop(['key_0',"avg_delay"],axis=1,inplace=True)
    Final.to_csv("Final.csv")
    Final1=Final[['doc_id','Aging Bucket']].copy()
    doc = Final1["doc_id"].tolist()
    aging= Final1["Aging Bucket"].tolist()   
    a=[]
    for i in range(len(doc)):
        if doc[i] in doc_list:
            a.append({"doc_id":str(doc[i]),"aging_bucket": str(aging[i])})
    

    return a
    

def alll():
    print(" Predict")

    nulldata = pd.read_csv("nulldata.csv")


    nulldata["clear_date"]=pd.to_datetime(nulldata.clear_date)
    nulldata["posting_date"]=pd.to_datetime(nulldata.posting_date)
    nulldata["due_in_date"]=pd.to_datetime(nulldata.due_in_date)
    nulldata["baseline_create_date"]=pd.to_datetime(nulldata.baseline_create_date)


    nulldata1=nulldata.copy()

    from sklearn.preprocessing import LabelEncoder
    business_codern = LabelEncoder()
    business_codern.fit(nulldata['business_code'])
    nulldata['business_code_enc'] = business_codern.transform(nulldata['business_code'])
    
   # if :
    #nulldata['cust_number'] = nulldata['cust_number'].str.replace('CCCA',"1").str.replace('CCU',"2").str.replace('CC',"3").astype(int)
    nulldata['cust_number'] = nulldata['cust_number'].replace('CCCA02',"1").replace(['CCU001','CCU013','CCU002'],"2").replace(['CC3411','CC6000'],"3").astype(int)
    #nulldata['cust_number'] = nulldata['cust_number'].str.replace('CCCA',"1").astype(int)
    #nulldata['cust_number'] = nulldata['cust_number'].str.replace('CCU',"2").astype(int)
    #nulldata['cust_number'] = nulldata['cust_number'].str.replace('CC',"3").astype(int)



    nulldata['day_of_cleardate'] = nulldata['clear_date'].dt.day
    nulldata['month_of_cleardate'] = nulldata['clear_date'].dt.month
    nulldata['year_of_cleardate'] = nulldata['clear_date'].dt.year

    nulldata['day_of_postingdate'] = nulldata['posting_date'].dt.day
    nulldata['month_of_postingdate'] = nulldata['posting_date'].dt.month
    nulldata['year_of_postingdate'] = nulldata['posting_date'].dt.year

    nulldata['day_of_due'] = nulldata['due_in_date'].dt.day
    nulldata['month_of_due'] = nulldata['due_in_date'].dt.month
    nulldata['year_of_due'] = nulldata['due_in_date'].dt.year

    nulldata['day_of_createdate'] = nulldata['baseline_create_date'].dt.day
    nulldata['month_of_createdate'] = nulldata['baseline_create_date'].dt.month
    nulldata['year_of_createdate'] = nulldata['baseline_create_date'].dt.year
    
    

    label_encoder = EncoderExt()
    label_encoder1 = EncoderExt()
    label_encoder1.fit(nulldata['cust_payment_terms'])
    label_encoder1.fit(nulldata['business_code'])
    label_encoder.fit(nulldata['name_customer'])
    nulldata['cust_payment_terms_enc']=label_encoder1.transform(nulldata['cust_payment_terms'])
    nulldata['business_code_enc']=label_encoder1.transform(nulldata['business_code'])
    nulldata['name_customer_enc']=label_encoder.transform(nulldata['name_customer'])


    nulldata.drop(['business_code',"baseline_create_date","due_in_date","posting_date","name_customer","clear_date","cust_payment_terms"],axis=1,inplace=True)
    nulldata.drop(['day_of_cleardate',"month_of_cleardate","year_of_cleardate"],axis=1,inplace=True)

    nulldata2=nulldata[['cust_number', 'buisness_year', 'doc_id', 'converted_usd',
           'business_code_enc', 'name_customer_enc', 'cust_payment_terms_enc',
           'day_of_postingdate', 'month_of_postingdate', 'year_of_postingdate',
           'day_of_createdate', 'month_of_createdate', 'year_of_createdate',
           'day_of_due', 'month_of_due', 'year_of_due']]

    model = pickle.load(open("model.sav", 'rb'))

    final_result = model.predict(nulldata2)

    final_result = pd.Series(final_result,name='avg_delay')

    nulldata1.reset_index(drop=True,inplace=True)
    Final = nulldata1.merge(final_result , on = nulldata.index )

    Final['clear_date'] = pd.to_datetime(Final['due_in_date']) + pd.to_timedelta(Final['avg_delay'], unit='s')

    Final['avg_delay'] = Final.apply(lambda row: row.avg_delay//(24 * 3600), axis = 1)

    bins= [0,15,30,45,60,100]
    labels = ['0-15','16-30','31-45','46-60','Greatar than 60']
    Final['Aging Bucket'] = pd.cut(Final['avg_delay'], bins=bins, labels=labels, right=False)


    Final.drop(['key_0',"avg_delay"],axis=1,inplace=True)
    Final.to_csv("Final.csv")
    Final1=Final[['doc_id','Aging Bucket']].copy()
    doc = Final1["doc_id"].tolist()
    aging= Final1["Aging Bucket"].tolist()   
    a=[]
    for i in range(len(doc)):
        #if doc[i] in doc_list:
        a.append({"doc_id":doc[i],"aging_bucket": str(aging[i])})
    

    return a