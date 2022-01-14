from matcher import match
import tkinter as tk


def submit(root, text):
	global script
	script = text.get("1.0", tk.END)
	root.destroy()

def get_script():
	root = tk.Tk()
	frame = tk.Frame(root)
	frame.pack(padx = 10,pady=10)
	label = tk.Label(frame, text="Paste your script below:")
	text_box = tk.Text(frame, bd=1, relief="sunken", padx=5,pady=5, highlightthickness=0)
	submit_button = tk.Button(frame,text = 'Submit', command = lambda:submit(root, text_box))
	label.pack()
	text_box.pack()
	submit_button.pack()
	root.mainloop()

def is_word_said(word, script, done):
	pass

def update_prompter(text, script, done):
	text.configure(state="normal")
	text.delete("1.0", tk.END)
	for word in script.split():
		if word in done.split():
			text.insert(tk.END, word+" ", "done")
			# bug fix cant repeat again
		else:
			text.insert(tk.END, word+" ", "left")
	text.configure(state="disabled")
	
	# if not any(c.isalpha() for c in left):
	# 	root.destroy()

def prompter():
	root = tk.Tk()
	root.geometry('500x500')
	frame = tk.Frame(root)
	frame.pack(padx = 10,pady=10)
	label = tk.Label(frame, text="Start speaking to activate the teleprompter.")
	script_text = tk.Text(bd=1, relief="flat", padx=10,pady=10,font=("Helvetica",40))
	script_text.tag_configure("left", foreground="red")
	script_text.tag_configure("done", foreground="black")
	script_text.insert(tk.END, script, "left")
	label.pack()
	script_text.pack()
	progress = match(script)
	for done, left in progress:
		update_prompter(script_text, script, done)
		script_text.mark_set("scrollpos", "done.last")
		script_text.see("scrollpos")
		root.update()
	root.mainloop()

get_script()
print(script)
prompter()
