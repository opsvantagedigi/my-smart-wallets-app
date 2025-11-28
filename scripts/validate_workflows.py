import sys, glob, subprocess, io, os

# Ensure PyYAML
try:
    import yaml
except Exception:
    print('PyYAML not found; installing...')
    subprocess.check_call([sys.executable, '-m', 'pip', 'install', '--user', 'pyyaml'])
    import yaml

errors = []
files = sorted(glob.glob('.github/workflows/*.yml'))
if not files:
    print('No workflow files found in .github/workflows')
    sys.exit(1)

for f in files:
    try:
        text = open(f, 'r', encoding='utf-8').read()
    except Exception as e:
        errors.append(f + ': file read error: ' + str(e))
        continue
    # check for non-ascii em-dash
    if '\u2014' in text or '—' in text:
        errors.append(f + ': contains em-dash (U+2014) which can break YAML schemas')
    if '\t' in text:
        errors.append(f + ': contains tab characters (\t); use spaces for indentation')
    try:
        yaml.safe_load(io.StringIO(text))
    except Exception as e:
        errors.append(f + ': yaml parse error: ' + str(e))

if errors:
    print('YAML VALIDATION ERRORS:')
    for e in errors:
        print('-', e)
    sys.exit(2)

print('YAML validation passed: all .github/workflows/*.yml load cleanly and no em-dash or tabs found')
sys.exit(0)
