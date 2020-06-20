
import json
import pandas as pd
import numpy as np
import cv2
import matplotlib.pyplot as plt
from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
import random
from sklearn.decomposition import PCA 
from sklearn.manifold import MDS
from sklearn.metrics import pairwise_distances
from sklearn import preprocessing 
from flask import Flask,render_template, request, redirect, Response, jsonify

app=Flask(__name__)

#preprocessing of data
imdb=pd.read_csv('final_500.csv')
result1=imdb.iloc[:,[3,4,5,7,8,9,10,11,12,14,15]]
label = preprocessing.LabelEncoder()
result1["Rated"]=label.fit_transform(result1["Rated"])
result1["Genre"]=label.fit_transform(result1["Genre"])
result1["Country"]=label.fit_transform(result1["Country"])
result1["Language"]=label.fit_transform(result1["Language"])
result1["Responsibility"]=label.fit_transform(result1["Responsibility"])
# cleaned = imdb.set_index('Title').Country.str.split(',', expand=True).stack()
# imdb1=pd.get_dummies(cleaned).groupby(level=0).sum()
# result=pd.merge(imdb,imdb1,on='Title')
# cleaned2 = imdb.set_index('Title').Language.str.split(',', expand=True).stack()
# imdb3=pd.get_dummies(cleaned2).groupby(level=0).sum()
# result1 = pd.merge(result,imdb3,on='Title')
# result1=result1.iloc[:,[1,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34]]
# result1 = pd.get_dummies(result1, columns=['Rated'])
# result1 = pd.get_dummies(result1, columns=['Genre'])
# result1 = pd.get_dummies(result1, columns=['Responsibility'])
scaler = StandardScaler()
original_data = scaler.fit_transform(result1)
# stratified_data=pd.DataFrame()
# random_data=pd.DataFrame()





@app.route("/")
def index():
    return render_template("index.html")


def find_elbow():
    wcss=[]
    for i in range(1, 11):
        kmeans = KMeans(n_clusters=i, init='k-means++', max_iter=300, n_init=10, random_state=0)
        kmeans.fit(result1)
        wcss.append(kmeans.inertia_)
    plt.plot(range(1, 11), wcss)
    plt.title('Elbow Method')
    plt.xlabel('Number of clusters')
    plt.ylabel('WCSS')
    plt.show()


# def stratified_sampling():
#     global stratified_data
#     global original_data
#     kmeans = KMeans(n_clusters=3, init='k-means++', max_iter=300, n_init=10, random_state=0)
#     kmeans.fit(result1)
#     labels = kmeans.labels_
#     centroids = kmeans.cluster_centers_
#     df=pd.DataFrame()
#     for i in range(0,3):
#         ds=original_data[labels==i]
#         df = pd.DataFrame(data=ds)
#         rows = df.sample(frac =.5) 
#         stratified_data=stratified_data.append(rows)
#     print(stratified_data)
#     # return stratified_data


# def random_sampling():
#     global random_data
#     global original_data
#     random_data=original_data
#     random_data = random_data.sample(frac =.5) 
    # return random_data


 # def loading_attributes():
#     mean_vec = np.mean(original_data, axis=0)
#     cov_mat = (original_data - mean_vec).T.dot((original_data - mean_vec)) / (original_data.shape[0]-1)
#     # cov_mat = np.cov(X_std.T)
#     eig_vals, eigenVectors = np.linalg.eig(cov_mat)   
#     squaredLoadings = []
#     ftrCount = len(eigenVectors)
#     for ftrId in range(0, ftrCount):
#         loadings = 0
#         for compId in range(0, k):
#             loadings = loadings + eigenVectors[compId][ftrId] * eigenVectors[compId][ftrId]
#             squaredLoadings.append(loadings) 



@app.route('/original_data_scree',methods=['POST'])
def original_data_scree():
    pca = PCA()
    principalComponents = pca.fit_transform(original_data)
    features = range(pca.n_components_)
    x=pca.explained_variance_ratio_*100
    X1=x.tolist()
    
    Y1=np.arange(1,12).tolist()
    final=[]
    for i in range(len(X1)):
        final.append({'A':Y1[i],'B':X1[i]})
    # print(final)
    a=pca.explained_variance_ratio_*100

    cum=[]
    sum=0;
    for i in range(0,11):
        sum=sum+a[i]
        cum.append(sum)
    intrin=0;
    for i in range(0,11):
        if cum[i]>=75:
            intrin=i+1
            break

    loadings = np.sum(np.square(pca.components_), axis=0)
    indices_of_top_3_attributes = loadings.argsort()[-3:][::-1]
    top_two_components = pca.components_[:2]
    print(indices_of_top_3_attributes)

    rect={
        'datapoints':final,
        'cumulative':cum,
        'intrinsic':intrin

    }
    

    return jsonify(rect)

@app.route('/random_data_scree',methods=['POST'])
def random_data_scree():
    # global random_data
    # global random_data
    # global original_data
    # random_data=pd.DataFrame()
    random_data = original_data.sample(frac =.5) 
    pca = PCA()
    principalComponents = pca.fit_transform(random_data)
    features = range(pca.n_components_)
    x=pca.explained_variance_ratio_*100
    X1=x.tolist()
    
    Y1=np.arange(1,12).tolist()
    final=[]
    for i in range(len(X1)):
        final.append({'A':Y1[i],'B':X1[i]})
    # print(final)
    a=pca.explained_variance_ratio_*100

    cum=[]
    sum=0;
    for i in range(0,11):
        sum=sum+a[i]
        cum.append(sum)
    intrin=0;
    for i in range(0,11):
        if cum[i]>=75:
            intrin=i+1
            break

    loadings = np.sum(np.square(pca.components_), axis=0)
    indices_of_top_3_attributes = loadings.argsort()[-3:][::-1]
    top_two_components = pca.components_[:2]
    print(indices_of_top_3_attributes)

    rect={
        'datapoints':final,
        'cumulative':cum,
        'intrinsic':intrin

    }
    

    return jsonify(rect)

@app.route('/stratified_data_scree',methods=['POST'])
def stratified_data_scree():
    # strat=stratified_sampling()
    stratified_data=pd.DataFrame()
    kmeans = KMeans(n_clusters=3, init='k-means++', max_iter=300, n_init=10, random_state=0)
    kmeans.fit(result1)
    labels = kmeans.labels_
    centroids = kmeans.cluster_centers_
    df=pd.DataFrame()
    for i in range(0,3):
        ds=original_data[labels==i]
        df = pd.DataFrame(data=ds)
        rows = df.sample(frac =.5) 
        stratified_data=stratified_data.append(rows)
    # print(strat)
    pca = PCA()
    principalComponents = pca.fit_transform(stratified_data)
    features = range(pca.n_components_)
    x=pca.explained_variance_ratio_*100
    X1=x.tolist()
    
    Y1=np.arange(1,12).tolist()
    final=[]
    for i in range(len(X1)):
        final.append({'A':Y1[i],'B':X1[i]})
    # print(final)
    a=pca.explained_variance_ratio_*100

    cum=[]
    sum=0;
    for i in range(0,11):
        sum=sum+a[i]
        cum.append(sum)
    intrin=0;
    for i in range(0,11):
        if cum[i]>=75:
            intrin=i+1
            break

    loadings = np.sum(np.square(pca.components_), axis=0)
    indices_of_top_3_attributes = loadings.argsort()[-3:][::-1]
    top_two_components = pca.components_[:2]
    print(indices_of_top_3_attributes)

    rect={
        'datapoints':final,
        'cumulative':cum,
        'intrinsic':intrin

    }
    

    return jsonify(rect)





@app.route('/mds_original_correlation',methods=['POST'])
def mds_original_correlation():
    D = pairwise_distances(original_data,metric='correlation')
    model = MDS(n_components=2, dissimilarity='precomputed')
    out = model.fit_transform(D)
    col = pd.DataFrame(out)
    output1=out[:,0].tolist()
    output2=out[:,1].tolist()
    final=[]
    for i in range(len(output1)):
        final.append({'A':output1[i],'B':output2[i]})
    print(final)
    
    return jsonify(final)








@app.route('/mds_stratified_correlation',methods=['POST'])
def mds_stratified_correlation():
    stratified_data=pd.DataFrame()
    kmeans = KMeans(n_clusters=3, init='k-means++', max_iter=300, n_init=10, random_state=0)
    kmeans.fit(result1)
    labels = kmeans.labels_
    centroids = kmeans.cluster_centers_
    df=pd.DataFrame()
    for i in range(0,3):
        ds=original_data[labels==i]
        df = pd.DataFrame(data=ds)
        rows = df.sample(frac =.5) 
        stratified_data=stratified_data.append(rows)
    D = pairwise_distances(stratified_data,metric='correlation')
    model = MDS(n_components=2, dissimilarity='precomputed')
    out = model.fit_transform(D)
    col = pd.DataFrame(out)
    output1=out[:,0].tolist()
    output2=out[:,1].tolist()
    final=[]
    for i in range(len(output1)):
        final.append({'A':output1[i],'B':output2[i]})
    print(final)
    
    return jsonify(final)

@app.route('/mds_random_correlation',methods=['POST'])
def mds_random_correlation():
    random_data = original_data.sample(frac =.5) 
    D = pairwise_distances(random_data,metric='correlation')
    model = MDS(n_components=2, dissimilarity='precomputed')
    out = model.fit_transform(D)
    col = pd.DataFrame(out)
    output1=out[:,0].tolist()
    output2=out[:,1].tolist()
    final=[]
    for i in range(len(output1)):
        final.append({'A':output1[i],'B':output2[i]})
    print(final)
    
    return jsonify(final)

@app.route('/mds_original_euclidean',methods=['POST'])
def mds_original_euclidean():
    D = pairwise_distances(original_data,metric='euclidean')
    model = MDS(n_components=2, dissimilarity='precomputed')
    out = model.fit_transform(D)
    col = pd.DataFrame(out)
    output1=out[:,0].tolist()
    output2=out[:,1].tolist()
    final=[]
    for i in range(len(output1)):
        final.append({'A':output1[i],'B':output2[i]})
    print(final)
    
    return jsonify(final)

@app.route('/mds_stratified_euclidean',methods=['POST'])
def mds_stratified_euclidean():
    stratified_data=pd.DataFrame()
    kmeans = KMeans(n_clusters=3, init='k-means++', max_iter=300, n_init=10, random_state=0)
    kmeans.fit(result1)
    labels = kmeans.labels_
    centroids = kmeans.cluster_centers_
    df=pd.DataFrame()
    for i in range(0,3):
        ds=original_data[labels==i]
        df = pd.DataFrame(data=ds)
        rows = df.sample(frac =.5) 
        stratified_data=stratified_data.append(rows)
    D = pairwise_distances(stratified_data,metric='euclidean')
    model = MDS(n_components=2, dissimilarity='precomputed')
    out = model.fit_transform(D)
    col = pd.DataFrame(out)
    output1=out[:,0].tolist()
    output2=out[:,1].tolist()
    final=[]
    for i in range(len(output1)):
        final.append({'A':output1[i],'B':output2[i]})
    print(final)
    
    return jsonify(final)

@app.route('/mds_random_euclidean',methods=['POST'])

def mds_random_euclidean():
    random_data = original_data.sample(frac =.5) 
    D = pairwise_distances(random_data,metric='euclidean')
    model = MDS(n_components=2, dissimilarity='precomputed')
    out = model.fit_transform(D)
    col = pd.DataFrame(out)
    output1=out[:,0].tolist()
    output2=out[:,1].tolist()
    final=[]
    for i in range(len(output1)):
        final.append({'A':output1[i],'B':output2[i]})
    
    return jsonify(final)

@app.route('/pca_scatter',methods=['POST'])
def pca_scatter():
    pca = PCA(n_components=2)
    out = pca.fit_transform(original_data)
    output1=out[:,0].tolist()
    output2=out[:,1].tolist()
    final=[]
    for i in range(len(output1)):
        final.append({'A':output1[i],'B':output2[i]})
    
    return jsonify(final)

@app.route('/pca_scatter_stratified',methods=['POST'])
def pca_scatter_stratified():
    stratified_data=pd.DataFrame()
    kmeans = KMeans(n_clusters=3, init='k-means++', max_iter=300, n_init=10, random_state=0)
    kmeans.fit(result1)
    labels = kmeans.labels_
    centroids = kmeans.cluster_centers_
    df=pd.DataFrame()
    for i in range(0,3):
        ds=original_data[labels==i]
        df = pd.DataFrame(data=ds)
        rows = df.sample(frac =.5) 
        stratified_data=stratified_data.append(rows)
    pca = PCA(n_components=2)
    out = pca.fit_transform(stratified_data)
    output1=out[:,0].tolist()
    output2=out[:,1].tolist()
    final=[]
    for i in range(len(output1)):
        final.append({'A':output1[i],'B':output2[i]})
    
    return jsonify(final)

@app.route('/pca_scatter_random',methods=['POST'])
def pca_scatter_random():
    random_data = original_data.sample(frac =.5) 
    pca = PCA(n_components=2)
    out = pca.fit_transform(random_data)
    output1=out[:,0].tolist()
    output2=out[:,1].tolist()
    final=[]
    for i in range(len(output1)):
        final.append({'A':output1[i],'B':output2[i]})
    print(final)
    
    return jsonify(final)


@app.route('/scatter_matrix_original',methods=['POST'])
def scatter_matrix_original():
    # random_data=pd.DataFrame(original_data)
    # random_data = random_data.sample(frac =.5) 
    pca = PCA()
    principalComponents = pca.fit_transform(original_data)
    loadings = np.sum(np.square(pca.components_), axis=0)
    indices_of_top_3_attributes = loadings.argsort()[-3:][::-1]
    # top_two_components = pca.components_[:2]
    a=original_data[indices_of_top_3_attributes[0]].tolist()
    b=original_data[indices_of_top_3_attributes[1]].tolist()
    c=original_data[indices_of_top_3_attributes[2]].tolist()
    final=[]
    for i in range(len(a)):
        final.append({'A':a[i],'B':b[i],'C':c[i]})

    return jsonify(final)

@app.route('/scatter_matrix_random',methods=['POST'])
def scatter_matrix_random():
    random_data=pd.DataFrame(original_data)
    random_data = random_data.sample(frac =.5) 
    pca = PCA()
    principalComponents = pca.fit_transform(random_data)
    loadings = np.sum(np.square(pca.components_), axis=0)
    indices_of_top_3_attributes = loadings.argsort()[-3:][::-1]
    # top_two_components = pca.components_[:2]
    a=random_data[indices_of_top_3_attributes[0]].tolist()
    b=random_data[indices_of_top_3_attributes[1]].tolist()
    c=random_data[indices_of_top_3_attributes[2]].tolist()
    final=[]
    for i in range(len(a)):
        final.append({'A':a[i],'B':b[i],'C':c[i]})

    return jsonify(final)

@app.route('/scatter_matrix_stratified',methods=['POST'])
def scatter_matrix_stratified():
    stratified_data=pd.DataFrame()
    kmeans = KMeans(n_clusters=3, init='k-means++', max_iter=300, n_init=10, random_state=0)
    kmeans.fit(result1)
    labels = kmeans.labels_
    centroids = kmeans.cluster_centers_
    df=pd.DataFrame()
    for i in range(0,3):
        ds=original_data[labels==i]
        df = pd.DataFrame(data=ds)
        rows = df.sample(frac =.5) 
        stratified_data=stratified_data.append(rows)
    pca = PCA()
    principalComponents = pca.fit_transform(stratified_data)
    loadings = np.sum(np.square(pca.components_), axis=0)
    indices_of_top_3_attributes = loadings.argsort()[-3:][::-1]
    # top_two_components = pca.components_[:2]
    a=stratified_data[indices_of_top_3_attributes[0]].tolist()
    b=stratified_data[indices_of_top_3_attributes[1]].tolist()
    c=stratified_data[indices_of_top_3_attributes[2]].tolist()
    final=[]
    for i in range(len(a)):
        final.append({'A':a[i],'B':b[i],'C':c[i]})

    return jsonify(final)

# random_sampling()
# stratified_sampling()
# mds_original_correlation()

# stratified_data_scree()
# find_elbow()
# original_data_scree()
if __name__ == "__main__":
    app.run(debug=True)
    # app.run("localhost", 5000)



