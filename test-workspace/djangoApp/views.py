# pyright: reportUndefinedVariable=false
def index(request):
    if a:
        context={'test2':'value'}
        return render(request,'djangoApp/index2.html',context)
    context={'test1':'value'}
    return render(request,'djangoApp/index.html',context)