#!/usr/bin/python2.7
#
#

import psycopg2

def setUp():
    db = psycopg2.connect("dbname='udacity' user='sabertazimi' password='123456'")
    cur = db.cursor()

    cur.execute("CREATE TABLE IF NOT EXISTS udacity (id serial PRIMARY KEY, num integer, data varchar);")
    cur.execute("SELECT * from udacity;")
    
    db.commit()
    cur.close()
    db.close()

def addData(rawData):
    db = psycopg2.connect("dbname='udacity' user='sabertazimi' password='123456'")
    cur = db.cursor()
    
    cur.execute("INSERT INTO udacity (data) values (%s)", (rawData, ))
    db.commit()
    
    cur.close()
    db.close()

def updateDate(id, rawNum, rawData):
    db = psycopg2.connect("dbname='udacity' user='sabertazimi' password='123456'")
    cur = db.cursor()
    
    cur.execute("UPDATE udacity SET num = %s, data = %s WHERE id = %s", (rawNum, rawData, id))
    db.commit()
    
    cur.close()
    db.close()
    
def deleteData(rawData):
    db = psycopg2.connect("dbname='udacity' user='sabertazimi' password='123456'")
    cur = db.cursor()
    
    cur.execute("DELETE from udacity WHERE data = %s", (rawData, ))
    db.commit()
    
    cur.close()
    db.close()
    
    
def getAllData():
    db = psycopg2.connect("dbname='udacity' user='sabertazimi' password='123456'")
    cur = db.cursor()
    
    cur.execute("SELECT num, data from udacity")
    posts = ({
        'num': str(row[0]),
        'time': str(row[1])
    } for row in cur.fetchall())
    
    cur.close()
    db.close()
    
    return posts
    
    
def printAllData():
    db = psycopg2.connect("dbname='udacity' user='sabertazimi' password='123456'")
    cur = db.cursor()
    
    cur.execute("SELECT * from udacity order by num")
    for row in cur.fetchall():
        print " ", row[0], " ", row[1], " ", row[2]

    cur.close()
    db.close()
    
setUp()
printAllData()
