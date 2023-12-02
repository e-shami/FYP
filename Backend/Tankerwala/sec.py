def getChildren(x):
    Children = []
    if x <= 7:
        Children.append((x+3,x))
    if x <= 5:
        Children.append((x+5,x))
    if x >= 3:
        Children.append((x-3,x))
    if x >= 5:
        Children.append((x-5,x))
    return Children


InitialState = 0
GoalState = 1
GoalFound = False
OpenQueue = [(InitialState,-1)]
ClosedList = []
while OpenQueue:
    x = OpenQueue.pop(0)
    ClosedList.append(x)
    print('Examined:',x[0])
    if x[0]==GoalState:
        GoalFound = True
        break
    Children = getChildren(x[0])
    ChildrenNew = list(Children)
    for i in Children:
        if i[0] in [j[0] for j in OpenQueue] or i[0] in [k[0] for k in ClosedList]:
            ChildrenNew.remove(i)
    OpenQueue = OpenQueue + ChildrenNew
if GoalFound:
    print('Goal found')
    SolutionPath = [x[0]]
    while x[1] != -1:
        for i in ClosedList:
            if i[0]==x[1]:
                x = i
        SolutionPath += [x[0]]
    SolutionPath.reverse()
    print(SolutionPath)
else:
    print('Goal not found')