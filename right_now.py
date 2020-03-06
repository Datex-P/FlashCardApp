######

print('Once upon a time...')

class TreeNode:
  def __init__(self, story_piece):
    self.story_piece=story_piece
    self.choices=[ ]
    
  def add_child(self, node):
    self.node=node
    self.choices+=[node]
    
  def traverse(self):
    story_node=self
    print(story_node.story_piece)
    
  while len(story_node.choices) >0:
    choice=int(input('Enter 1 or 2 to continue the story: '))
    if choice not in ['1', '2']:
      print('Please enter number 1 or 2.')
    else:
      chosen_index=int(choice)
      chosen_index-=1
      
    
      
    
    
story_root=TreeNode("""
You are in a forest clearing. There is a path to the left.
A bear emerges from the trees and roars!
Do you: 
1 ) Roar back!
2 ) Run to the left...
""")

print(story_root.story_piece)
user_choice=input('What is your name?')
print(user_choice)

choice_a=TreeNode("""
The bear is startled and runs away.
Do you:
1 ) Shout 'Sorry bear!'
2 ) Yell 'Hooray!'
""")    

choice_b=TreeNode("""
You come across a clearing full of flowers. 
The bear follows you and asks 'what gives?'
Do you:
1 ) Gasp 'A talking bear!'
2 ) Explain that the bear scared you.
""")

story_root.add_child(choice_a)
story_root.add_child(choice_b)

story_root.traverse()

chosen_cild.assign
  
    
    