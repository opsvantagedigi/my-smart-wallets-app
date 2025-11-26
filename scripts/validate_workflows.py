import glob, yaml, sys
errs = False
for path in glob.glob('.github/workflows/*.y*'):
    try:
        with open(path,'r',encoding='utf-8') as f:
            data = yaml.safe_load(f)
        print(path, 'OK')
    except Exception as e:
        errs = True
        print(path, 'ERROR:', e)
if errs:
    sys.exit(1)
