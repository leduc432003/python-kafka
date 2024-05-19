from tkinter import *
from tkinter import messagebox
import sqlite3

ws = Tk()
ws.title("Đăng ký tài khoản - Python Desktop")
f = ('Time', 14)
var = StringVar()
var.set('male')

conn = sqlite3.connect('quanlysinhvien.db')
cur = conn.cursor()
cur.execute('''create table if not exists sinhvien(
            name text,
            favorite text,
            gender text,
            address text,
            email text,
            contact text,
            country text,
            state text,
            topic text
)''')
conn.commit()


frame = Frame(
    ws
)
right_frame = Frame(
    ws,
    bd=2,
    padx=10,
    pady=10
)
Label(frame, text='ITVoyagers Registration Form', bg='blue', font=('Times', 30), fg='white').pack()
Label(right_frame, text='Name of visitor', font=f, fg='blue').grid(row=0, column=0, sticky=W, pady=10)
Label(right_frame, text='Favourite programming language', font=f, fg='blue').grid(row=1, column=0, sticky=W, pady=10)
Label(right_frame, text='Gender', font=f, fg='blue').grid(row=2, column=0, sticky=W, pady=10)
Label(right_frame, text='Address', font=f, fg='blue').grid(row=3, column=0, sticky=W, pady=10)
Label(right_frame, text='Email id', font=f, fg='blue').grid(row=4, column=0, sticky=W, pady=10)
Label(right_frame, text='Contact no', font=f, fg='blue').grid(row=5, column=0, sticky=W, pady=10)
Label(right_frame, text='Country', font=f, fg='blue').grid(row=6, column=0, sticky=W, pady=10)
Label(right_frame, text='State', font=f, fg='blue').grid(row=7, column=0, sticky=W, pady=10)
Label(right_frame, text='Select topics you wish to learn', font=f, fg='blue').grid(row=8, column=0, sticky=W, pady=10)
gender_frame = LabelFrame(right_frame, padx=10, pady=10)
topic_frame = LabelFrame(right_frame, padx=10, pady=10)
register_name = Entry(right_frame, font=f)
register_favorite = Entry(right_frame, font=f)
male_rb = Radiobutton(gender_frame, text='Nam', variable=var, value='male', font=('Times', 10))
female_rb = Radiobutton(gender_frame, text='Nữ', variable=var, value='female', font=('Times', 10))
register_address = Entry(right_frame, font=f)
register_email = Entry(right_frame, font=f)
register_contact = Entry(right_frame, font=f)
register_country = Entry(right_frame, font=f)
register_state = Entry(right_frame, font=f)
Checkbutton1 = StringVar() 
Checkbutton2 = StringVar()

Button1 = Checkbutton(topic_frame, text = "Python", 
                    variable = Checkbutton1, 
                    onvalue = 'Python', 
                    offvalue = '',
                    font=('Times', 10)
                    ).pack()
Button2 = Checkbutton(topic_frame, text = "Business Intelligence", 
                    variable = Checkbutton2, 
                    onvalue = 'Business Intelligence', 
                    offvalue = '',
                    font=('Times', 10)
                    ).pack()


def saverecord():
    try:
        con = sqlite3.connect('quanlysinhvien.db')
        cur = con.cursor()
        cur.execute("INSERT INTO sinhvien VALUES(:name, :favorite, :gender, :address, :email, :contact, :country, :state, :topic)", {
            'name': register_name.get(),
            'favorite': register_favorite.get(),
            'gender': var.get(),
            'address': register_address.get(),
            'email': register_email.get(),
            'contact': register_contact.get(),
            'country': register_country.get(),
            'state': register_state.get(),
            'topic': Checkbutton1.get() + ', ' + Checkbutton2.get()
        })
        con.commit()
        messagebox.showinfo('Thông báo !', 'Đã thêm mới sinh viên thành công !')   
    except Exception as ep:
        messagebox.showerror('', ep)

def validateform(): 
    check_counter = 0
    warn = ""
    if register_name.get() == "" :
        warn = "Bạn cần nhập họ tên!"
        messagebox.showinfo("Thông báo lỗi !", warn)
    else:
        check_counter += 1

    if register_favorite.get() == "":
        warn = "Thiếu sở thích"
        messagebox.showinfo("Thông báo lỗi !", warn)
    else:
        check_counter += 1
    if register_address.get() == "":
        warn = "Thiếu địa chỉ"
        messagebox.showinfo("Thông báo lỗi !", warn)
    else:
        check_counter += 1
    if register_state.get() == "":
        warn = "Thiếu thành phố"
        messagebox.showinfo("Thông báo lỗi !", warn)
    else:
        check_counter += 1
    if register_contact.get() == "":
        warn = "Thiếu số điện thoại"
        messagebox.showinfo("Thông báo lỗi !", warn)
    else:
        check_counter += 1
    if register_country.get() == "":
        warn = "Thiếu quốc gia"
        messagebox.showinfo("Thông báo lỗi !", warn)
    else:
        check_counter += 1
    if register_email.get() == "":
        warn = "Thiếu email"
        messagebox.showinfo("Thông báo lỗi !", warn)
    else:
        check_counter += 1
    if Checkbutton1.get() == "" and Checkbutton2.get() == "":
        warn = "Thiếu topic"
        messagebox.showinfo("Thông báo lỗi !", warn)
    else:
        check_counter += 1

    if var.get() == "":
        warn = "Chưa chọn giới tính"
        messagebox.showinfo("Thông báo lỗi !", warn)
    else:
        check_counter += 1
    
    print (warn)
    saverecord()


register_name.grid(row=0, column=1, pady=10, padx=20) 
register_favorite.grid(row=1, column=1, pady=10, padx=20) 
register_address.grid(row=3, column=1, pady=10, padx=20) 
register_email.grid(row=4, column=1, pady=10, padx=20) 
register_contact.grid(row=5, column=1, pady=10, padx=20)
register_country.grid(row=6, column=1, pady=10, padx=20)    
register_state.grid(row=7, column=1, pady=10, padx=20)
topic_frame.grid(row=8, column=1, pady=10, padx=20)
frame.pack()
right_frame.pack()
register_btn = Button(ws, text='REGISTER HERE', bg='blue', font=('Times', 30), fg='white', command=validateform).pack()
gender_frame.grid(row=2, column=1, pady=10, padx=20) 
male_rb.pack(expand=True)
female_rb.pack(expand=True)
ws.mainloop()