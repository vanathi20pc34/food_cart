import sqlite3
import os

def get_cookies(url):
    path = os.path.join(os.path.expandvars("%userprofile%"), "AppData\Roaming\Mozilla\Firefox\Profiles")
    with open("cookies.txt","w") as f1:
        for i in os.listdir(path):
            d = os.path.join(path, i)
            if os.path.isdir(d):
                try:
                    con = sqlite3.connect(d+'\cookies.sqlite')
                    cur = con.cursor()
                    cur.execute('''SELECT * FROM moz_cookies''')
                    
                    for item in cur.fetchall():
                        if url != "":
                            for c in item:
                                if url in str(c):
                                    f1.write(str(list(item)))
                                    f1.write("\n")
                                    break
                        else:
                            f1.write(str(list(item)))
                            f1.write("\n")
                except:
                    print()
                    print("NO TABLE FOUND !")

url = input("ENTER DOMAIN NAME OR ITS SUBSTRING : ")
get_cookies(url)