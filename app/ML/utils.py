import platform
import subprocess
from pathlib import Path


def emojis(str=""):
    # Return platform-dependent emoji-safe version of string
    return (
        str.encode().decode("ascii", "ignore")
        if platform.system() == "Windows"
        else str
    )


def colorstr(*input):
    # Colors a string https://en.wikipedia.org/wiki/ANSI_escape_code, i.e.  colorstr('blue', 'hello world')
    # color arguments, string
    *args, string = input if len(input) > 1 else ("blue", "bold", input[0])
    colors = {
        "black": "\033[30m",  # basic colors
        "red": "\033[31m",
        "green": "\033[32m",
        "yellow": "\033[33m",
        "blue": "\033[34m",
        "magenta": "\033[35m",
        "cyan": "\033[36m",
        "white": "\033[37m",
        "bright_black": "\033[90m",  # bright colors
        "bright_red": "\033[91m",
        "bright_green": "\033[92m",
        "bright_yellow": "\033[93m",
        "bright_blue": "\033[94m",
        "bright_magenta": "\033[95m",
        "bright_cyan": "\033[96m",
        "bright_white": "\033[97m",
        "end": "\033[0m",  # misc
        "bold": "\033[1m",
        "underline": "\033[4m",
    }
    return "".join(colors[x] for x in args) + f"{string}" + colors["end"]


def check_requirements(requirements="requirements.txt", exclude=()):
    # Check installed dependencies meet requirements (pass *.txt file or list of packages)
    import pkg_resources as pkg

    prefix = colorstr("red", "bold", "requirements:")
    if isinstance(requirements, (str, Path)):  # requirements.txt file
        file = Path(requirements)
        if not file.exists():
            print(f"{prefix} {file.resolve()} not found, check failed.")
            return
        requirements = [
            f"{x.name}{x.specifier}"
            for x in pkg.parse_requirements(file.open())
            if x.name not in exclude
        ]
    else:  # list or tuple of packages
        requirements = [x for x in requirements if x not in exclude]

    n = 0  # number of packages updates
    for r in requirements:
        try:
            pkg.require(r)
        except Exception as e:  # DistributionNotFound or VersionConflict if requirements not met
            n += 1
            print(
                f"{prefix} {e.req} not found and is required by YOLOv5, attempting auto-update..."
            )
            print(subprocess.check_output(f"pip install {e.req}", shell=True).decode())

    if n:  # if packages updated
        source = file.resolve() if "file" in locals() else requirements
        s = (
            f"{prefix} {n} package{'s' * (n > 1)} updated per {source}\n"
            f"{prefix} ⚠️ {colorstr('bold', 'Restart runtime or rerun command for updates to take effect')}\n"
        )
        print(emojis(s))  # emoji-safe


def check_online():
    # Check internet connectivity
    import socket

    try:
        socket.create_connection(("1.1.1.1", 443), 5)  # check host accesability
        return True
    except OSError:
        return False


def check_git_status():
    # Recommend 'git pull' if code is out of date
    print(colorstr("github: "), end="")
    try:
        assert (
            Path(".git").exists() or Path("../../.git").exists()
        ), "skipping check (not a git repository)"
        assert check_online(), "skipping check (offline)"

        cmd = "git fetch && git config --get remote.origin.url"
        url = (
            subprocess.check_output(cmd, shell=True).decode().strip().rstrip(".git")
        )  # github repo url
        branch = (
            subprocess.check_output("git rev-parse --abbrev-ref HEAD", shell=True)
            .decode()
            .strip()
        )  # checked out
        n = int(
            subprocess.check_output(
                f"git rev-list {branch}..origin/master --count", shell=True
            )
        )  # commits behind
        if n > 0:
            s = (
                f"⚠️ WARNING: code is out of date by {n} commit{'s' * (n > 1)}. "
                f"Use 'git pull' to update or 'git clone {url}' to download latest."
            )
        else:
            s = f"up to date with {url} ✅"
        print(emojis(s))  # emoji-safe
    except Exception as e:
        print(e)


check_git_status()
check_requirements()
