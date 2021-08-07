"""
updater.py

"""
import subprocess
from pathlib import Path
from utils.strings import colorstr, emojis


def check_update():
    """
    Compare it to the latest work to see if there are any changes
    """

    # Check any changes by comparing from remote github repository
    check_git_status()


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
            Path(".git").exists() or Path("../.git").exists()
        ), "skipping check (not a git repository)"
        assert check_online(), "skipping check (offline)"

        cmd = "git fetch && git config --get remote.origin.url"
        url = (
            subprocess.check_output(cmd, shell=True)
            .decode()
            .strip()
            .replace(".git", "")
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
            print(subprocess.check_output(f"pip install {e.req}", shell=True).decode())

    if n:  # if packages updated
        source = file.resolve() if "file" in locals() else requirements
        s = (
            f"{prefix} {n} package{'s' * (n > 1)} updated per {source}\n"
            f"{prefix} ⚠️ {colorstr('bold', 'Restart runtime or rerun command for updates to take effect')}\n"
        )
        print(emojis(s))  # emoji-safe
    else:
        print(f"{prefix} All requirement already satisfied")


if __name__ == "__main__":
    check_git_status()
    check_requirements()
