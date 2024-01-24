# pyright: reportUndefinedVariable=false
def index(request):
    if a:
        if b:
            return render(request,'djangoApp/index3.html')
        context={'test2_1':'value','test2_2':'value'}
        return render(request,'djangoApp/index2.html',context)
    context={'test1':'value'}
    return render(request,'djangoApp/index.html',context)