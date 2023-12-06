# pyright: reportUndefinedVariable=false
def index(request):
    context={'key':'value'}
    return render(request,'djangoApp/index.html',context)