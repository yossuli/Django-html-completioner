# pyright: reportUndefinedVariable=false
def index(request):
    context={'test1':'value'}
    return render(request,'djangoApp/index.html',context)