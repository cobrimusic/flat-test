# utils
import requests

class Git:
    def __init__(self, owner, repo):
        self.endpoint: str = "https://api.github.com"
        self.owner: str = owner
        self.main_repo: str = repo
        self.headers: object = {
            'Authorization': 'token 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'
        }

        
    def branches(self):
        """
            Get all branches from github
        """
        try:
            # /repos/{owner}/{repo}/branches
            url = "{}/repos/{}/{}/branches".format(self.endpoint, self.owner, self.main_repo)
            
            return requests.get(url, headers = self.headers).json()
        except Exception as e:
            return e


    def branch(self, branch):
        """
            Get branch from github
        """
        try:
            # /repos/{owner}/{repo}/branches/{branch}
            # /repos/{owner}/{repo}/commits
            results = {
                "branch": {},
                "commits": []
            }
            url = "{}/repos/{}/{}/branches/{}".format(self.endpoint, self.owner, self.main_repo, branch)
            response = requests.get(url, headers = self.headers).json()

            if response:
                sha = response['commit']['sha']
                results['branch'] = response

                url_commits = "{}/repos/{}/{}/commits?sha={}".format(self.endpoint, self.owner, self.main_repo, sha)
                response = requests.get(url_commits, headers = self.headers).json()

                results['commits'] = response

            return results
        except Exception as e:
            return e


    def commit(self, commit):
        """
            Get commit from github
        """
        try:
            # /repos/{owner}/{repo}/commits/{ref}
            url = "{}/repos/{}/{}/commits/{}".format(self.endpoint, self.owner, self.main_repo, commit)

            return requests.get(url, headers = self.headers).json()
        except Exception as e:
            return e

    
    def compare_branches(self, basehead):
        """
            Get branches diffs
        """
        try:
            # /repos/{owner}/{repo}/compare/{basehead}
            url = "{}/repos/{}/{}/compare/{}".format(self.endpoint, self.owner, self.main_repo, basehead)

            return requests.get(url, headers = self.headers).json()
        except Exception as e:
            return e